$.fn.hasAttr = function (name) {
  return this.attr(name) !== undefined;
};
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function display(n) {
  var c = n > 0 ? '+' : '-';
  n = Math.abs(n);

  var string = '(';
  for (var i = 0; i < n; i++) {
    string += c;
  }
  string += ')';

  return string;
}
$(function () {

  var $navbar = $('#navbar');

  var $form = $('form').first();
  var $form_p1 = $form.find('#first-player');
  var $form_p2 = $form.find('#second-player');

  $form.submit(function (e) {
    e.preventDefault();

    var _mode = $navbar.find('.active [aria-controls]').attr('aria-controls');
    var $first_score = $(`#${_mode} #first-player-score`);
    var $second_score = $(`#${_mode} #second-player-score`);

    var player1 = $form_p1.val();
    var player2 = $form_p2.val();
    var current;
    var other;

    if ($form_p1.hasAttr('current')) {
      current = player1;
      other = player2;

      $form_p1.removeAttr('current');
      $form_p2.attr('current', 'current');
    } else {
      current = player2;
      other = player1;

      $form_p2.removeAttr('current');
      $form_p1.attr('current', 'current');
    }

    var data = mode[_mode];

    var jet1 = getRandomInt(0, 19);
    var jet2 = getRandomInt(0, 19);
    var jet3 = getRandomInt(0, 19);
    var jet4 = getRandomInt(0, 19);

    var action = data.action[jet1];
    var emplacement = data.emplacement[jet2];
    var avec = data.avec[jet3];
    var position = data.position[jet4];

    var selector = `#${_mode} .recap`;
    var dom = `<p><span>${current}</span> <strong>${action.name}</strong> ${display(action.points)} <strong>${emplacement.name}</strong> ${display(emplacement.points)} de <span>${other}</span> avec <strong>${avec.name}</strong> ${display(avec.points)} dans la position <strong>${position.name}</strong> ${display(position.points)}</p>`;
    $(dom).appendTo(selector).first();

    $('#first-player-name').text(player1);
    $('#second-player-name').text(player2);

    if (current == player1) {
      var score = parseInt($first_score.text(), 10) + action.points + emplacement.points + avec.points + position.points;
      $first_score.text(score);
    } else {
      var score = parseInt($second_score.text(), 10) + action.points + emplacement.points + avec.points + position.points;
      $second_score.text(score);
    }
  });
});