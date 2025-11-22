public static class PacienteValidation
{
    public static bool CpfValido(string? cpf)
    {
        if (string.IsNullOrWhiteSpace(cpf)) return false;

        cpf = new string(cpf.Where(char.IsDigit).ToArray());

        if (cpf.Length != 11) return false;
        if (new string(cpf[0], 11) == cpf) return false;

        int[] multiplicador1 = { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
        int[] multiplicador2 = { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };

        string tempCpf = cpf[..9];
        int soma = 0;

        for (int i = 0; i < 9; i++)
            soma += (tempCpf[i] - '0') * multiplicador1[i];

        int digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        tempCpf += digito1;

        soma = 0;
        for (int i = 0; i < 10; i++)
            soma += (tempCpf[i] - '0') * multiplicador2[i];

        int digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        return cpf.EndsWith($"{digito1}{digito2}");
    }

    public static bool TelefoneValido(string? tel) =>
        string.IsNullOrWhiteSpace(tel) ? true :
        System.Text.RegularExpressions.Regex.IsMatch(tel, @"^\(?\d{2}\)?\s?\d{4,5}\-?\d{4}$");

    public static bool EmailValido(string email) =>
        new System.ComponentModel.DataAnnotations.EmailAddressAttribute().IsValid(email);

    public static bool ValidadeCarteirinhaValida(string validade) =>
        System.Text.RegularExpressions.Regex.IsMatch(validade, @"^(0[1-9]|1[0-2])\/\d{4}$");
}
