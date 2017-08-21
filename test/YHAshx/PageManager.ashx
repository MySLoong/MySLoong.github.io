<%@ WebHandler Language="C#" Class="PageManager" %>

using System;
using System.Web;
using System.Collections.Generic;

public class PageManager : IHttpHandler
{

    protected Dictionary<string, ActionMethod> Actions
    {
        get
        {
            return new Dictionary<string, ActionMethod>() {
                {"index",new ActionMethod("index","主页",PageIndex) },
                {"about",new ActionMethod("about","关于我们",PageAbout) },
                {"blog",new ActionMethod("blog","我们的博客",PageBlog) },
                {"contact",new ActionMethod("contact","联系我们",PageContact) },
                {"services",new ActionMethod("services","我们的服务",PageServices) },
                {"work",new ActionMethod("work","我们的工作",PageWork) }
            };
        }
    }
    private HttpContext Context = null;

    /// <summary>
    /// 
    /// </summary>
    /// <param name="context"></param>
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "application/json";
        Context = context;
        string action = context.Request["action"];
        if (action == null || action == string.Empty)
        {
            Context.Response.Write("{\"flag\":false}");
            return;
        }
        if (Actions.ContainsKey(action) == false)
        {
            Context.Response.Write("{\"flag\":false}");
            return;
        }
        ActionMethod actMethod = Actions[action];
        if (actMethod == null)
        {
            Context.Response.Write("{\"flag\":false}");
            return;
        }
        if(actMethod.Function == null)
        {
            Context.Response.Write("{\"flag\":false}");
            return;
        }
        actMethod.Function();
    }

    /// <summary>
    /// 
    /// </summary>
    private void PageIndex()
    {
        if (Context != null)
        {
            Context.Response.Write("{\"flag\":true}");
        }
    }

    /// <summary>
    /// 
    /// </summary>
    private void PageAbout()
    {
        if (Context != null)
        {
            Context.Response.Write("{\"flag\":true}");
        }
    }

    /// <summary>
    /// 
    /// </summary>
    private void PageBlog()
    {
        if (Context != null)
        {
            Context.Response.Write("{\"flag\":true}");
        }
    }

    /// <summary>
    /// 
    /// </summary>
    private void PageContact()
    {
        if (Context != null)
        {
            Context.Response.Write("{\"flag\":true}");
        }
    }

    /// <summary>
    /// 
    /// </summary>
    private void PageServices()
    {
        if (Context != null)
        {
            Context.Response.Write("{\"flag\":true}");
        }
    }

    /// <summary>
    /// 
    /// </summary>
    private void PageWork()
    {
        if (Context != null)
        {
            Context.Response.Write("{\"flag\":true}");
        }
    }
    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}