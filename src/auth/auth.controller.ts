import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Roles } from '@/decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { UserRoleEnum } from '@/enums/user-role';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    public signIn(@Body() credentials: LoginDto) {
        return this.authService.signIn(credentials.email, credentials.password);
    }

    // This route is a example by Guards
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRoleEnum.BARBER)
    @Get('profile')
    profile(@Request() req: any) {
        return {
            'payload': req.user,
            'message': 'You have access to this route called profile'
        }
    }
}
