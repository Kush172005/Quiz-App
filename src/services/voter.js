const bcrypt = require("bcrypt");
const prisma = require("../config/database");

class VoterService {
    constructor(details) {
        this.details = details;
    }
    static async getVoterByEmail(email) {
        return await prisma.voter.findUnique({ where: { email } });
    }
    async createVoter(voterDetails = this.details) {
        const voter = await prisma.voter.create({
            data: {
                name: voterDetails.name,
                email: voterDetails.email,
                password: bcrypt.hashSync(voterDetails.password.toString(), 4),
            },
        });
        return { voter, message: "Account created Successfully!" };
    }
}
module.exports = VoterService;
