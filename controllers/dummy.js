import axios from 'axios';

const url = process.env.DUMMY_API_URL;

export const getDummyUsers = async (req, res) => {
    const path = req.query.q ? '/users/search' : '/users';

    try {
        const response = await axios.get(url + path, {
            params: {
                q: req.query.q || '',
                key: req.query.key || '',
                value: req.query.value || '',
                limit: req.query.limit || '',
                skip: req.query.skip || ''
            }
          });

        res.json({ message: 'Success', data: response.data.users });
    } catch (e) {
        res.status(500).send(e);
    }
}