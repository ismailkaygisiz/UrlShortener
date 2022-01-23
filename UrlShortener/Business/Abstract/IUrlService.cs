using Core.Business;
using Core.Utilities.Results.Abstract;
using Entities.Concrete;
using System;

namespace Business.Abstract
{
    public interface IUrlService : IServiceRepository<Url, Guid>
    {
        IDataResult<Url> AddWithEntity(Url url);
        IDataResult<Url> GetByKeyword(string keyword);
        IDataResult<Url> GetByCode(string code);
        IResult Redirect(Url url);
    }
}
