import type { ConstructNameLiteral } from '../types';
import { generateConstructNameLiteral } from './generate-construct-names';

function generateQueueStackName<StackName extends string>(
  stackName: StackName
): ConstructNameLiteral<StackName, 'queue', 'stack'> {
  return generateConstructNameLiteral(stackName, 'queue', 'stack');
}

function generateUserStackName<StackName extends string>(
  stackName: StackName
): ConstructNameLiteral<StackName, 'user', 'stack'> {
  return generateConstructNameLiteral(stackName, 'user', 'stack');
}

function generateS3StackName<StackName extends string>(
  stackName: StackName
): ConstructNameLiteral<StackName, 's3', 'stack'> {
  return generateConstructNameLiteral(stackName, 's3', 'stack');
}

function generateTableStackName<StackName extends string>(
  stackName: StackName
): ConstructNameLiteral<StackName, 'dynamodb', 'stack'> {
  return generateConstructNameLiteral(stackName, 'dynamodb', 'stack');
}

export {
  generateQueueStackName,
  generateUserStackName,
  generateS3StackName,
  generateTableStackName,
};
