import { store } from 'store';
import { resetRamp } from 'packages/store/store-ca/ramp/slice';

export default function resetStore() {
  store.dispatch(resetRamp());
}
