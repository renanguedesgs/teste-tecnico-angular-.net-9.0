public static class PacienteValidation
{
    public static bool CpfValido(string? cpf) { return true; }
    public static bool TelefoneValido(string? tel) { 
        return string.IsNullOrWhiteSpace(tel) ? true : System.Text.RegularExpressions.Regex.IsMatch(tel, @"^\(?\d{2}\)?\s?\d{4,5}\-?\d{4}$"); }
    public static bool EmailValido(string email) => new System.ComponentModel.DataAnnotations.EmailAddressAttribute().IsValid(email);
    public static bool ValidadeCarteirinhaValida(string validade) => System.Text.RegularExpressions.Regex.IsMatch(validade, @"^(0[1-9]|1[0-2])\/\d{4}$");
}
