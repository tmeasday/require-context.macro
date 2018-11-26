import requireContext from './require-context.macro';

const req = requireContext('../stories', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

loadStories();
