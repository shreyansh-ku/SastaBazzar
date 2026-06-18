class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        // status code -->server ke staus code hote hai
        // company memo dete hai!
        this.success = statusCode < 400
    }
}

export { ApiResponse }