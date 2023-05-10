export enum Paggination{
    count = 3
}


export enum status{
    pending = 1,
    approved = 2,
    rejected = 3,
    unknown = 4
}

export const roles = {
    ADMIN : 1,
    OWNER : 2
}

export const adminData = [
    {
        name: "admin",
        email: "admin@gmail.com",
        password: "12345",
        role: roles.ADMIN
    }
]

export const roleData = [
    {
        _id: roles.ADMIN,
        name: "admin"
    },
    {
        _id: roles.OWNER,
        name: "owner"
    }
]

// type stringArray = string[]

// export type StringArray = stringArray[] 