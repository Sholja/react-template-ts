// eslint-disable-next-line
let readline = require('readline');
// eslint-disable-next-line
let fs = require('fs');

const ReducerTemplate = require('./generator-templates/reducer-template');
const ComponentTemplate = require('./generator-templates/component-template');

const defaultFolder = `${__dirname}/src/app`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const createFolder = (path) =>
  new Promise((resolve) => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
      resolve();
    }
  });

const createFile = (path, content) =>
  new Promise((resolve) => {
    fs.writeFile(path, content, (err) => {
      if (err) {
        throw err;
      }

      return resolve();
    });
  });

const questions = (question, defaultFolderPath, path, featureName, content, extension, hidePathInFileName) =>
  new Promise((resolve) => {
    rl.question(question, async (res) => {
      const answer = res.toLowerCase();

      const getFileName = () => (hidePathInFileName ? '' : `-${path}`);

      if ((answer === 'y' || answer === 'yes') && path && defaultFolderPath && featureName) {
        await createFolder(`${defaultFolderPath}/${path}`);
        await createFile(`${defaultFolderPath}/${path}/${featureName}${getFileName()}.${extension || 'js'}`, content);
      }

      return resolve(answer);
    });
  });

const start = () => {
  rl.question('Hi. My name is NiGi and I am a very "smart" bot. I am here to help you create some cool stuff. So let us start. \n\nWhat is the name of the feature FOLDER? ', async (folder) => {
    const folderPath = `${defaultFolder}/${folder}`;
    await createFolder(folderPath);

    const buildActionTypes = await questions('\nWill there be any ACTION TYPES in this feature? [y/N] \n', folderPath, 'constants', 'action-types', 'export default {\n};', null, true);

    await questions('\nWill there be any React.JS ACTIONS in this feature? [y/N] \n', folderPath, 'actions', folder, '');

    const reducer = ReducerTemplate();
    await questions('\nWill there be any Redux REDUCERS in this feature? [y/N] \n', folderPath, 'reducers', folder, reducer.create(folder, buildActionTypes === 'y' || buildActionTypes === 'yes'));

    const buildComponents = await questions('\nWill there be any React.js COMPONENTS in this feature? [y/N] \n');
    if (buildComponents === 'y' || buildComponents === 'yes') {
      createFolder(`${defaultFolder}/${folder}/components`);
      const component = ComponentTemplate();
      await createFile(`${defaultFolder}/${folder}/components/${folder}.js`, component.create(folder));
    }

    await questions('\nWill there be any styles in this feature? [y/N] \n', folderPath, 'styles', folder, '', 'scss', true);

    rl.close();
  });
};

start();
