  var Links = {
    SetColor:function (color){
    // var alist = document.querySelectorAll('a');
    // var i = 0;
    // while (i < alist.length) {
    //   alist[i].style.color = color;
    //   i = i + 1;
    // }
    $('a').css('color',color);
  }
}
  var Body = {
    setColor: function (color) {
      //document.querySelector('body').style.color = color;
      $('body').css('color',color);
    },
    setBackgroundColor: function (color) {
      $('body').css('backgroundColor', color);
      //document.querySelector('body').style.backgroundColor = color;
    }
  }
  function nightdayHandler(self) {
    //<!-- day night handler-->
    var target = document.querySelector('body');
    if (self.value === 'night') {
      Body.setBackgroundColor('#818181');
      Body.setColor('white');
      self.value = 'day';
      /*document. , Body. Links. 이런건 객체
      객체에 속해 있는 함수 : 메소드(method)
      객체에 속해 있는 변수 : 속성 Property
      */
      Links.SetColor('#e0e8ff');
    } else {
      Body.setBackgroundColor('white');
      Body.setColor('black');
      self.value = 'night';
      Links.SetColor('black');
    }
  }
