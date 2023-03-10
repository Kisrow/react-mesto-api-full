const router = require('express').Router();
const {
  defineUserIdValidation,
  updateUserInfoValidation,
  updateUserAvatarValidation,
} = require('../middlewares/validate');
const {
  getUsers,
  getUserById,
  getAuthorizedUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getAuthorizedUser);
router.patch('/me', updateUserInfoValidation, updateUserProfile);
router.patch('/me/avatar', updateUserAvatarValidation, updateUserAvatar);
router.get('/:userId', defineUserIdValidation, getUserById);

module.exports = router;
