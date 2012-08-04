// Level 1
// Static synchronous definition in global context
// Implementation of scopeornot API
// https://github.com/eric-brechemier/scopeornot

(function(){
  var
    // global context
    globalContext = this;

  /*
    Function: scope(code[,needs[,name]]): any
    Run code immediately in global context, without taking needs into account,
    and set the return value, if any, to a property with given name in the
    global context.

    Parameters:
      code  - function(context), the code to run with the global context
              provided as parameter
      needs - optional, array of strings, the names of the properties that
              this code would like to find in the global context; ignored,
              only useful for documentation purpose
      name  - optional, string, name of the global context property to set
              the value that the code may return

    Returns:
      any, the return value of the code
  */
  function scope(code,needs,name){
    // call code synchronously in global context,
    // without taking needs into account
    var result = code(globalContext);
    if (typeof name === "string"){
      globalContext[name] = result;
    }
    return result;
  }

  // export scope() to global context
  globalContext.scope = scope;
}());
