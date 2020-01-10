using FluentValidation;

namespace Application.Validator
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder.NotEmpty()
            .MinimumLength(6).WithMessage("Passwords must be a minimum of 6 characters")
            .Matches("[A-Z]").WithMessage("Password must contain atleast 1 uppercase character")
            .Matches("[a-z]").WithMessage("Password must contain atleast 1 lowercase character")
            .Matches("[0-9]").WithMessage("Password must contain a numeric value")
            .Matches("[^a-zA-Z0-9]").WithMessage("Password must contain a non-alphanumeric value");

            return options;
        }
    }
}