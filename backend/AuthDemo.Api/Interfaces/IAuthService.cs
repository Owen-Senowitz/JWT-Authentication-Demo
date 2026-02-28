using AuthDemo.Api.DTOs;

namespace AuthDemo.Api.Interfaces;

public interface IAuthService
{
    Task<(bool Success, string Message)> RegisterAsync(UserRegisterDto registerDto);
    Task<(bool Success, string Token, string Message)> LoginAsync(UserLoginDto loginDto);
}
