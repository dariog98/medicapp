import bcrypt from 'bcryptjs'

const encrypt = async (text) => {
    const hash = await bcrypt.hash(text, 10)
    return hash
}

const compare = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword)
}

export { encrypt, compare }