'use strict';

import { all, fork } from 'redux-saga/effects';
import { skillSaga } from '../sagas/skill.saga';

export default function* rootSaga() {
  yield all([fork(skillSaga)]);
}

export { skillSaga };
