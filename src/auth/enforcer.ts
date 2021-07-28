import { Enforcer, newModelFromString, StringAdapter } from 'casbin';
import { policy } from './policy';
import { model } from './model';

export default async function createEnforcer(): Promise<Enforcer> {
  const enforcer = new Enforcer();
  await enforcer.initWithModelAndAdapter(newModelFromString(model), new StringAdapter(policy));
  return enforcer;
}
