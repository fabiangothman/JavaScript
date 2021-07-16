//Normal function with types
var getSubstract = function (num1, num2) { return num1 - num2; };
document.write("Type of \"getSubstract\" is " + typeof getSubstract + ".<br />");
document.write("Type of result of \"getSubstract\" is " + typeof getSubstract(5, 5) + ".<br />");
document.write("Result of \"getSubstract\" is " + getSubstract(5, 5) + ".<br /><br />");
//Functions with multiple types in parameters
function getSum(num1, num2) {
    if (typeof num1 === "string")
        num1 = parseInt(num1);
    if (typeof num2 === "string")
        num2 = parseInt(num2);
    return num1 + num2;
}
document.write("Type of \"getSum\" is " + typeof getSum + ".<br />");
document.write("Type of result of \"getSum\" is " + typeof getSum(5, 5) + ".<br />");
document.write("Result of \"getSum\" is " + getSum(5, 5) + ".<br /><br />");
//Functions with OPTIONAL (with "?") parameters
var concatName = function (firstname, lastname) { return (lastname === undefined) ? firstname : firstname + " " + lastname; };
document.write("Result of \"concatName\" with 1 param is " + concatName("Fabian") + ".<br />");
document.write("Result of \"concatName\" with 2 params is " + concatName("Fabian", "Murillo") + ".<br /><br />");
//Functions with VOID (undefined) return
var writeMessage = function (message) {
    document.write("The message is " + message + ".");
};
document.write("Result of \"writeMessage\" is " + writeMessage("Fabian") + ".<br />");
document.write("Type of result of \"writeMessage\" is " + typeof writeMessage() + ".<br /><br />");
