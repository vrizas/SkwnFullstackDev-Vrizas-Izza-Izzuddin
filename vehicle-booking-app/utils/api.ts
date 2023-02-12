const api = (() => {
    const BASE_URL = 'http://127.0.0.1:8000/api'

    async function _fetchWithAuth(url: string, options = { headers: {} }) {
        return fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${getAccessToken()}`
            }
        })
    }

    function putAccessToken(token: string) {
        localStorage.setItem('accessToken', token)
    }

    function getAccessToken() {
        return localStorage.getItem('accessToken')
    }

    async function login({ username, password }: any) {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })

        const responseJson = await response.json()

        const { status, message, token } = responseJson

        if (!status) {
            throw new Error(message)
        }

        return token
    }

    async function getOwnProfile() {
        const response = await _fetchWithAuth(`${BASE_URL}/users/me`)
        const responseJson = await response.json()
        const { status, message, user } = responseJson

        if (!status) {
            throw new Error(message)
        }

        return user
    }

    async function getVehicleReports() {
        const response = await _fetchWithAuth(`${BASE_URL}/vehicle-reports`)
        const responseJson = await response.json()
        const { status, message, vehicleReports } = responseJson

        if (!status) {
            throw new Error(message)
        }

        return vehicleReports
    }

    async function getApprovals() {
        const response = await _fetchWithAuth(`${BASE_URL}/approvals`)
        const responseJson = await response.json()
        const { status, message, approvals } = responseJson

        if (!status) {
            throw new Error(message)
        }

        return approvals
    }

    async function getDrivers() {
        const response = await _fetchWithAuth(`${BASE_URL}/drivers`)
        const responseJson = await response.json()
        const { status, message, drivers } = responseJson

        if (!status) {
            throw new Error(message)
        }

        return drivers
    }

    async function getVehicles() {
        const response = await _fetchWithAuth(`${BASE_URL}/vehicles`)
        const responseJson = await response.json()
        const { status, message, vehicles } = responseJson

        if (!status) {
            throw new Error(message)
        }

        return vehicles
    }

    async function getManagers() {
        const response = await _fetchWithAuth(`${BASE_URL}/managers`)
        const responseJson = await response.json()
        const { status, message, managers } = responseJson

        if (!status) {
            throw new Error(message)
        }

        return managers
    }

    async function getDirectors() {
        const response = await _fetchWithAuth(`${BASE_URL}/directors`)
        const responseJson = await response.json()
        const { status, message, directors } = responseJson

        if (!status) {
            throw new Error(message)
        }

        return directors
    }

    async function createReports(data: Object) {
        const response = await _fetchWithAuth(`${BASE_URL}/vehicle-reports`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        } as any)
        const responseJson = await response.json()
        const { status, message, report } = responseJson

        if (!status) {
            throw new Error(message)
        }

        return report
    }

    async function approveReport(data: Object, id: number) {
        const response = await _fetchWithAuth(`${BASE_URL}/vehicle-reports/${id}/approve`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        } as any)
        const responseJson = await response.json()
        const { status, message } = responseJson

        if (!status) {
            throw new Error(message)
        }

        return responseJson
    }

    async function markAsDoneReport(id: number) {
        const response = await _fetchWithAuth(`${BASE_URL}/vehicle-reports/${id}/mark-as-done`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        } as any)
        const responseJson = await response.json()
        const { status, message } = responseJson

        if (!status) {
            throw new Error(message)
        }

        return responseJson
    }

    async function exportExcelReports() {
        try {
            const response = await _fetchWithAuth(`${BASE_URL}/vehicle-reports/export`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'blob'
                },
            } as any) as any;
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `vehicle-bookings-${new Date().getFullYear()}.xlsx`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error: any) {
            throw Error(error);
        }
    }

    async function getRole(id: string) {
        const response = await _fetchWithAuth(`${BASE_URL}/roles/${id}`)
        const responseJson = await response.json()
        const { status, message, role } = responseJson

        if (!status) {
            throw new Error(message)
        }

        return role
    }

    return {
        putAccessToken,
        getAccessToken,
        login,
        getOwnProfile,
        getVehicleReports,
        getApprovals,
        getDrivers,
        getVehicles,
        getManagers,
        getDirectors,
        createReports,
        exportExcelReports,
        getRole,
        approveReport,
        markAsDoneReport
    }
})()

export default api
