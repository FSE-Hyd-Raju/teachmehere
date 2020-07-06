'use strict';

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Skill } from '../actions/types';
import { postSkill } from '../../api/services';
import { postSkillSuccess, postSkillFailed } from '../actions/SkillActions';

function* onPostSkill(action) {
  try {
    console.log("===>",action)
    const skill = yield call(() => {
      return postSkill(action);
    });
    console.log('POST SUCCESSFULL', skill);
    yield put(postSkillSuccess({ isPostSuccess: true }));
  } catch (e) {
    yield put(postSkillFailed({ isPostSuccess: false }));
  }
}

export function* skillSaga() {
  yield takeLatest(Skill.POST_SKILL, onPostSkill);
}
