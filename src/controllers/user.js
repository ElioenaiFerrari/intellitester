import User from '@/models/user';
import Repo from '@/repo';
import Send from '@/utils/send';
import { request, response } from 'express';

const UserController = {
  index: (req = request, res = response) => {
    Repo.all(User).then(Send.json(res, 200)).catch(Send.json(res, 400));
  },
};

export default UserController;
