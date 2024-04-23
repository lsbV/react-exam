export class HttpService{
    public readonly baseUrl: string = "http://localhost:3000";
    public async get<T>(url: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}/${url}`);
        return await response.json();
    }
    public async post<T>(url: string, data: any): Promise<T> {
        const response = await fetch(`${this.baseUrl}/${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    }

    public async put<T>(url: string, data: any): Promise<T> {
        const response = await fetch(`${this.baseUrl}/${url}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    }

    public async delete<T>(url: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}/${url}`, {
            method: "DELETE",
        });
        return await response.json();
    }
}