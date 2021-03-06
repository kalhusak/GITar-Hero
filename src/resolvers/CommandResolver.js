import { some } from 'lodash';
import levenshtein from 'fast-levenshtein';

class CommandResolver {
  constructor () {
    this.checkIsCommandAllowed = ::this.checkIsCommandAllowed;
  }

  useLevenshteinFor (str1, str2) {
    return [
      /^git commit -m ".*"\s*$/,
      /^git branch \S*\s*/,
      /^git checkout (-b)? \S*\s*/,
      /^git remote add origin/,
      /^git merge (--no-ff) \S*\s?/
    ].some(exp => exp.test(str1) && exp.test(str2));
  };

  checkIsCommandAllowed (input, allowedCommands) {
    return some(allowedCommands, command => {
      if (this.useLevenshteinFor(input, command)) {
        return levenshtein.get(input, command) < 3;
      }
      return command === input;
    });
  }
}

export default new CommandResolver();
