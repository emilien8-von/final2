

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const httpMocks = require('node-mocks-http');
const { Puser } = require('../controller/user')
// Mocks
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../models/pseudo'); // pour le model
jest.mock('../services/mail'); // pour l'enovie de mail

const Users = require('../models/pseudo');
const envoi = require('../services/mail');

describe('Puser controller', () => {
  it('should hash password, create user, send token, and respond with 201', async () => {
    // Fake req and res
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'plainpassword',
      },
    });

    const res = httpMocks.createResponse();
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();

    // Faux hachage de mot de passe
    bcrypt.hash.mockResolvedValue('hashedPassword');
    
    // Faux profile
    Users.create.mockResolvedValue({
      _id: '123abc',
      email: 'test@example.com',
      password: 'hashedPassword',
    });

    // Fake JWT
    jwt.sign.mockReturnValue('fakeToken');

    // Fake envoi
    envoi.mockResolvedValue();

    await Puser(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith('plainpassword', 10);
    expect(Users.create).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'hashedPassword',
    });
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: '123abc' },
      expect.anything(),
      { expiresIn: '5m' }
    );
    expect(envoi).toHaveBeenCalledWith(expect.any(Object), 'fakeToken');
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'users created!, un message vous sera envoyés',
      reponse: {
        _id: '123abc',
        email: 'test@example.com',
        password: 'hashedPassword',
      },
    });
  });
});
