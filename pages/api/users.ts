import { NextApiRequest, NextApiResponse } from 'next';
import {createUser, getUsers, updateUser, deleteUser, User} from '@/models/user';

export default async (req: NextApiRequest, res: NextApiResponse): Promise <void> => {
    switch (req.method) {
        case 'GET':
                try {
                    const users: User[] = await getUsers();
                    res.status(200).json(users);
                } catch (error) {
                    // @ts-ignore
                    res.status(500).json({ error: error.message });
                }
            break;
        case 'POST':
            try {
                const { name, email , password } = req.body;
                const userId: number = await createUser(name, email , password);
                res.status(201).json({ userId , name, email });
            } catch (error) {
                // @ts-ignore
                res.status(500).json({ error: error.message });
            }
            break;
        default:
            res.status(405).json({ message: 'Method Not Allowed' });
    }
};

