using Entities.Concrete;
using FluentValidation;

namespace Business.ValidationRules.FluentValidation
{
    public class UrlValidator : FluentValidator<Url>
    {
        public UrlValidator()
        {
            RuleFor(url => url.UrlAddress).MinimumLength(5).WithMessage("Url minimum 5 karakterden oluşmalıdır.");
            RuleFor(url => url.UrlAddress).MaximumLength(1000).WithMessage("Url maksimum 1000 karakterden oluşabilir.");
            RuleFor(url => url.UrlAddress).Must(StartsWithHttp).WithMessage("Url adresi \"http://\" veya \"https://\" ile başlamalıdır.");


            RuleFor(url => url.Keyword).NotEmpty().WithMessage("Keyword boş olamaz.");
            RuleFor(url => url.Keyword).MinimumLength(2).WithMessage("Keyword minimum 2 karakterden oluşmalıdır.");
            RuleFor(url => url.Keyword).MaximumLength(30).WithMessage("Keyword maksimum 30 karakterden oluşabilir.");
        }

        public bool StartsWithHttp(string arg)
        {
            if (arg.StartsWith("http://"))
            {
                return true;
            }

            if (arg.StartsWith("https://"))
            {
                return true;
            }

            return false;
        }
    }
}
