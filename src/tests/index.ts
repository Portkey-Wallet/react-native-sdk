import BatchedBridge from 'react-native/Libraries/BatchedBridge/BatchedBridge';
import { TestModule } from './TestModule';
import { JSModuleIdentifier } from 'service/JsModules/BatchedBridges';

export const registerTestModule = () => {
  if (__DEV__) {
    BatchedBridge.registerCallableModule(JSModuleIdentifier.TEST_MODULE, TestModule);
  }
};
