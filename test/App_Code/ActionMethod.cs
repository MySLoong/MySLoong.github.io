using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// ActionMethod 的摘要说明
/// </summary>
public class ActionMethod
{
    public ActionMethod(string action, string actionname,Action function)
    {
        //
        // TODO: 在此处添加构造函数逻辑
        //
        this.Action = action;
        this.ActionName = actionname;
        this.Function = function;
    }

    public string Action { get; set; }
    public string ActionName { get; set; }
    public Action Function { get; set; }
}