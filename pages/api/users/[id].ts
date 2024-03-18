
import { NextApiRequest, NextApiResponse } from 'next';
import {updateUser, deleteUser, getUserById , User} from '@/models/user';

export default async (req: NextApiRequest, res: NextApiResponse): Promise <void> => {
    switch (req.method) {
        case 'GET':
        const userId = req.query.id as string;
            try {
                const user: User|null = await getUserById(parseInt(userId, 10));
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(404).json({ message: 'User not found' });
                }
            } catch (error) {
                // @ts-ignore
                res.status(500).json({ error: error.message });
            }
            break;
        case 'PUT':
            try {
                const { id, name, email } = req.body;
                await updateUser(id, name, email);
                res.status(200).json({ message: 'User updated successfully' });
            } catch (error) {
                // @ts-ignore
                res.status(500).json({ error: error.message });
            }
            break;
        case 'DELETE':
            const iDuser = req.query.id as string;
            try {
                const user = await deleteUser(parseInt(iDuser, 10));
                // @ts-ignore
                    res.status(200).json({ message: 'User deleted successfully' });
                } catch (error) {
                // @ts-ignore
                res.status(500).json({ error: error.message });
            }
            break;
        default:
            res.status(405).json({ message: 'Method Not Allowed' });
    }
};