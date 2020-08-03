
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {
      edge: 'right',
      inDurtion: 800,
      onOpenStart: () => {
        alert('starting open...')
      }
    });
  });