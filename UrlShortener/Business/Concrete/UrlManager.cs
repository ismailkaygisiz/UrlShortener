using Business.Abstract;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Transaction;
using Core.Aspects.Autofac.Validation;
using Core.Business;
using Core.Utilities.Results.Abstract;
using Core.Utilities.Results.Concrete;
using DataAccess.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;

namespace Business.Concrete
{
    public class UrlManager : BusinessService, IUrlService
    {
        private readonly IUrlDal _urlDal;

        public UrlManager(IUrlDal urlDal)
        {
            _urlDal = urlDal;
        }

        [TransactionScopeAspect]
        [ValidationAspect(typeof(UrlValidator))]
        public IResult Add(Url entity)
        {
            IResult result = BusinessRules.Run(CheckIfKeywordAlreadyExists(entity));

            if (!result.Success)
                return result;

            entity.Code = entity.Keyword;
            entity.CreatedDate = DateTime.Now;
            entity.LastDate = DateTime.Now.AddDays(10);

            _urlDal.Add(entity);
            return new SuccessResult();
        }

        [TransactionScopeAspect]
        [ValidationAspect(typeof(UrlValidator))]
        public IDataResult<Url> AddWithEntity(Url url)
        {
            var operation = Add(url);
            if (!operation.Success)
                return new ErrorDataResult<Url>(operation.Message);

            return new SuccessDataResult<Url>(url);
        }

        public IResult Delete(Url entity)
        {
            IResult result = BusinessRules.Run();

            if (!result.Success)
                return result;

            Url entityToDelete = GetById(entity.Id).Data;
            _urlDal.Delete(entityToDelete);
            return new SuccessResult();
        }

        public IResult Update(Url entity)
        {
            IResult result = BusinessRules.Run();

            if (!result.Success)
                return result;

            _urlDal.Update(entity);
            return new SuccessResult();
        }

        public IResult Redirect(Url url)
        {
            IResult result = BusinessRules.Run(CheckIfLastDateLessThanNow(url));

            if (!result.Success)
                return result;

            return new SuccessResult();
        }

        public IDataResult<List<Url>> GetAll()
        {
            return new SuccessDataResult<List<Url>>(_urlDal.GetAll());
        }

        public IDataResult<Url> GetById(Guid id)
        {
            var url = _urlDal.Get(e => e.Id == id);
            if (url == null)
                return new ErrorDataResult<Url>("Bu url artık mevcut değil.");

            return new SuccessDataResult<Url>(url);
        }

        public IDataResult<Url> GetByKeyword(string keyword)
        {
            var url = _urlDal.Get(e => e.Keyword == keyword);
            if (url == null)
                return new ErrorDataResult<Url>("Bu url mevcut değil. Son kullanım tarihi geçmiş olabilir.");

            return new SuccessDataResult<Url>(url);
        }

        public IDataResult<Url> GetByCode(string code)
        {
            var url = _urlDal.Get(e => e.Code == code);
            if (url == null)
                return new ErrorDataResult<Url>("Bu url mevcut değil. Son kullanım tarihi geçmiş olabilir.");

            return new SuccessDataResult<Url>(url);
        }

        private IResult CheckIfKeywordAlreadyExists(Url entity)
        {
            Url url = GetByKeyword(entity.Keyword).Data;
            if (url != null && url.LastDate < DateTime.Now)
            {
                var operation = Delete(url);
                if (!operation.Success)
                    throw new Exception();
            }

            if (url != null && url.LastDate > DateTime.Now)
            {
                return new ErrorResult("Keyword başkası tarafından kullanılıyor. Başka keyword deneyin");
            }

            return new SuccessResult();
        }

        private IResult CheckIfLastDateLessThanNow(Url url)
        {
            if (url.LastDate < DateTime.Now)
            {
                Delete(url);
                return new ErrorResult("Bu url artık mevcut değil.");
            }

            return new SuccessResult();
        }
    }
}
