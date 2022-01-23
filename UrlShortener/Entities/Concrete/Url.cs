using Core.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Concrete
{
    public class Url : IEntity
    {
        public Guid Id { get; set; }
        public string UrlAddress { get; set; }
        public string Keyword { get; set; }
        public string Code { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastDate { get; set; }
    }
}
