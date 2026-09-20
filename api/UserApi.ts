import { APIRequestContext, expect } from '@playwright/test';

export interface LoginUser {
    userName: string;
    password: string;
}

export class UserApi {
    private static readonly baseUrl = 'https://demoqa.com';

    constructor(
        private readonly request: APIRequestContext
    ) {}

    async createUser(user: LoginUser) {
        const response = await this.request.post(`${UserApi.baseUrl}/Account/v1/User`,
        {
            data: {
                userName: user.userName,
                password: user.password,
            },
        }
        );
        expect(response.ok()).toBeTruthy();
        return await response.json();
    }

    async generateToken(user: LoginUser): Promise<string> {
        const response = await this.request.post(`${UserApi.baseUrl}/Account/v1/GenerateToken`,
        {
            data: {
                userName: user.userName,
                password: user.password,
            },
        }
        );
        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();
        return responseBody.token;
    }

    async deleteUser(userId: string, token: string): Promise<void> {
        const response = await this.request.delete(`${UserApi.baseUrl}/Account/v1/User/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        expect(response.ok(), `DELETE user failed: ${response.status()} ${await response.text()}`).toBeTruthy();
    }
}