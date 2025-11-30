export class ServerUrlsV1{
    static base = "http://192.168.1.14:8000/api/v1"
    static login = `${this.base}/user/login`
    static register = `${this.base}/user/register`
    static extendSession = `${this.base}/user/extend-session`
    static ping = `${this.base}/user/ping`

    static addService = `${this.base}/services/service`
    static addLogoToService = `${this.base}/services/service/add-logo`
}
