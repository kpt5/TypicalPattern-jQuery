$(function () {

  //  画面の高さいっぱいのスライドショー
  //      $('#slider').bxSlider();
  //  画面幅を取得する
  //      var windowWidth = jQuery(window).width();
  var windowHeight = $(window).height();
//  alert(windowHeight);
//  XX  効かない。要素が下に隠れる
//  $(".bx_wrapper").height(windowHeight);
  $(".bx_wrapper img").height(windowHeight);
  //  任意のid（sliderと同階層など）の幅を取得する
  //  var windowWidth = jQuery('#slider_company').width();
  //  var width = windowWidth / 2;
  $('#slider').bxSlider({
    mode: 'fade', //スライドモードの指定・デフォルトは'horizontal'(水平移動)
    //                      vertical：縦方向のスライド・fade：フェードでの切り替え
    //    infiniteLoop: false, //スライドをループさせるかどうかの設定・初期値は「true」
    speed: 1000, //スライドの速さを変更・デフォルトは500
    pager: true, //ページャー（スライド下の「・・・」）を表示・デフォルトはtrue
    //    controls: false, //コントロール（左右の矢印）を表示・デフォルトはtrue
    nextText: '次へ', //「次へ」ボタンのテキストを指定・デフォルトは'Next'
    prevText: '前へ', //「次へ」ボタンのテキストを指定・デフォルトは'Prev'
    auto: true, //自動でスライド・デフォルトはfalse
    pause: 4000, //自動でスライドする時の停止時間をミリ秒で指定・デフォルトは4000
//    adaptiveHeight: true, //各スライドの高さに基づいてスライダの高さを動的に調整（隙間なし）か、隙間を作って固定（false：デフォルト）か。
//    adaptiveHeightSpeed: 0, //adaptiveHeightがtrueの場合の、スライダーの高さを変更させるイージングのスピード（単位：ms）。デフォルト：500
    //    slideWidth: 400, //各スライドの幅を指定。デフォルト：0
    //    CSSでsliderの親要素にwidthを設定するか、画面や要素の幅を取得してそれを基準に下記で設定する
    //    slideWidth: width,
  });

  //  スライド
  //「前へ」「次へ」ボタンの表示切り替え
  function toggleChangeBtn() {
    //    jQueryオブジェクトの中から、指定したセレクタのインデックス番号を取得する。
    var slideIndex = $('.slide').index($('.active'));
    //    一旦両ボタンを表示する
    $('#prev_btn,#next_btn').show();
    if (slideIndex === 0) {
      $('#prev_btn').hide();
      //      slideクラスの最後のインデックス番号か判定
    } else if (slideIndex === $('.slide').length - 1) {
      $('#next_btn').hide();
    }
  }

  $('.index_btn').click(function () {
    $('.active').removeClass('active');
    //    jQueryオブジェクトの中から、指定したセレクタのインデックス番号を取得する。
    var clickedIndex = $('.index_btn').index($(this));
    $('.slide').eq(clickedIndex).addClass('active');
    toggleChangeBtn();
  });

  //  $('#prev_btn').click(function () {
  //    //    jQueryオブジェクトの格納
  //    var $displaySlide = $('.active');
  //    $displaySlide.removeClass('active');
  //    $displaySlide.prev().addClass('active');
  //    toggleChangeBtn();
  //  });
  //
  //  $('#next_btn').click(function () {
  //    //    jQueryオブジェクトの格納
  //    var $displaySlide = $('.active');
  //    $displaySlide.removeClass('active');
  //    $displaySlide.next().addClass('active');
  //    toggleChangeBtn();
  //  });

  $('#prev_btn, #next_btn').click(function () {
    var $displaySlide = $('.active');
    $displaySlide.removeClass('active');
    //    if ($(this).hasClass('next-btn')) {
    //    if ($(this)==$('#next_btn')) {
    if ($(this).attr("id") === 'next_btn') {
      //    if ($(this).$('#next_btn').length) {
      //    if ($(this).$('#next_btn').size()) {
      $displaySlide.next().addClass('active');
    } else {
      $displaySlide.prev().addClass('active');
    }
    toggleChangeBtn();
  });

  //  モーダルの表示・非表示
  //  ログインボタン
  $('#login_btn').click(function () {
    $('#login_modal').fadeIn();
  });

  //  モーダル閉じるボタン
  $('#close_login_modal').click(function () {
    $('#login_modal').fadeOut();
  });

  $('.hover').hover(
    function () {
      $(this).find('.text_contents').addClass('text_active');
      //      $('this .text_contents').addClass('text_active');
      //      $('.text_contents').addClass('text_active');
    },
    function () {
      $(this).find('.text_contents').removeClass('text_active');
      //      $('this .text_contents').removeClass('text_active');
      //      $('.text_contents').removeClass('text_active');
    }
  );

  // アコーディオン
  $('.list_item').click(function () {
    var $answer = $(this).find('.answer');
    //    openは空のクラス
    if ($answer.hasClass('open')) {
      $answer.removeClass('open');
      //      非表示へ
      $answer.slideUp();
      // 子要素のspanタグの中身を書き換え
      $(this).find('b').text('＋');

    } else {
      $answer.addClass('open');
      //      表示へ
      $answer.slideDown();
      // 子要素のspanタグの中身を書き換え
      $(this).find('b').text('―');

    }
  });

  //  フォーム連携
  //  submit	フォームが送信された時
  $('#form').on('submit', function () {
    //    $("inputのセレクタ").val();   input内からvalueを取得。
    var selectItem = $('#select_form').val();
    var textItem = $('#text_form').val();
    if (textItem == '') {
      $('#error_message').text('理由を記入してください');
    } else {
      //      エラーメッセージを消す
      $('#error_message').text('');
    }
    $('#output_select').text(selectItem);
    $('#output_reason').text(textItem);
    //    ↓これでページが更新されない
    return false;
  });

  $('.option_btn').on('click', function () {
    var optionText = $(this).text();
    //  $("セレクタ").attr("属性名");   （attrメソッドのゲット）「attr」とは「attribute(属性)」の略。指定したセレクタの、指定した属性の値を取得。
    var clickedOption = $(this).attr('data-option');

    $('#text_form').val(optionText + 'が好きな理由は、');
    $('#select_form').val(clickedOption);
  });


  //  入力フォーム連携（Enterで連携）
  $('#input_text').on('change', function () {
    //    alert("■■■");
    var input_text = $("#input_text").val();
    $("#output_text").text(input_text);
  });

  //  入力フォーム連携（ボタンクリックで連携）
  //  submit	フォームが送信された時
  $('#form_2').on('submit', function () {
    var input_text_2 = $("#input_text_2").val();
    $("#output_text_2").text(input_text_2);
    //    ↓これでページが更新されない
    return false;
  });

  //  アコーディオンメニュー   △
  $("#acMenu dt").on("click", function () {
    $(this).next().slideToggle();
    $(this).toggleClass("active"); //追加部分
  });

  //  タブメニュー
  $("#tabMenu li a").on("click", function () {
    $("#tabBoxes div").hide();
    $($(this).attr("href")).fadeToggle();
    $("#tabMenu li a").removeClass("active"); //追加部分
    $(this).toggleClass("active"); //追加部分
  });
  return false;


  //  セレクトボックスで表示を切り替える   不可
  //  セレクトボックスの値変更時に着火
  $('.select').on('change', function () {
    // セレクトボックスの値を取得(例：北海道)
    var area = $(this).children(':selected').text();

    $('.area').each(function () {
      // 全て非表示にする(初期化)
      $(this).addClass('hide');

      // '全て'が選択されていれば
      if (area == '全て') {
        // 表示する
        $(this).removeClass('hide');

        // テキスト(例：北海道)が一致していれば
      } else if ($(this).html().match(area)) {
        // 表示する
        $(this).removeClass('hide');
      }
    });
  });

  //  セレクトボックスで表示を切り替える・改   不可
  //  セレクトボックスの値変更時に着火
  $('.select2').on('change', function () {
    // セレクトボックスの値を取得(例：北海道)
    var area2 = $(this).children(':selected').text();

    $('.area2').each(function () {
      // 全て非表示にする(初期化)
      $(this).addClass('hide');

      // '全て'が選択されていれば
      if (area2 == '全て') {
        // 表示する
        $(this).removeClass('hide');

        // テキスト(例：北海道)が一致していれば
      } else if ($(this).text().match(area)) {
        // 表示する
        $(this).removeClass('hide');
      }
    });
  });

  //  「トップへ戻る」ボタン（スクロールしたら右下に浮き上がって配置される）   不可
  jQuery(window).on("scroll", function ($) {
    //    フローティングボタンを表示するまでのスクロール量
    if (jQuery(this).scrollTop() > 100) {
      jQuery('.floating').show();
    } else {
      jQuery('.floating').hide();
    }
  });

  jQuery('.floating').click(function () {
    jQuery('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });

  //  「トップへ戻る」ボタン（スクロールしたら右下に浮き上がって配置される）・改
  $(window).scroll(function () {
    alert("■■■");

    //    フローティングボタンを表示するまでのスクロール量
    if ($(this).scrollTop() > 0.1) {
      alert("■■■");
      $('.floating2').show();
    } else {
      alert("■■■");
      $('.floating2').hide();
    }
  });

  $('.floating2').click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });


  //  日付表示。 不可
  function SpecificDay() {
    var i = 3; //(例)：3日後
    var date = new Date();
    date.setTime(date.getTime() + (i * 24 * 3600 * 1000));
    var y = date.getYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    if (y < 2000) {
      y += 1900;
    }
    wday = new Array("日", "月", "火", "水", "木", "金", "土");
    //    return(y + "年" + m + "月" + d + "日");
    document.write(y + "年" + m + "月" + d + "日");
    document.write(wday[date.getDay()]);
  }

  //  一行入力欄に入力された文字列を画面の指定箇所に表示する   未完
  //  $('#sampleText').on('change', function () {
  //    var sampleText = ;
  //    $("セレクタ").text(sampleText);
  //  })
});

//  アコーディオンメニュー
/*
メニューが複数ある場合には、「.next()」（意味＝次のやつ）を使うといいです。
これがないと、dtを押したときに全てのddが表示されてしまいます。
逆に言えば、使う箇所が1つしかない場合、こいつは使わなくてOK

以下のようにアニメーションの早さを変えることができます。
.slideToggle(“fast”)
.slideToggle(“slow”)
.slideToggle(200)
*/

//  タブメニュー
/*
以下でアニメーションの早さが変えることができます。
.fadeToggle(“fast”)
「$(this).attr(“href”)」＝「”#tabMenu li a”の”href”の値」＝「”tabBox1″,”#tabBox2″,”#tabBox3″のどれか」を意味します。
*/



//  jQuery

//  セレクタ（$()の中）
/*
CSSとほぼ同じような記述でセレクタを指定することが可能
セレクタはCSSセレクタ（CSSで使用するセレクタ）と同じ
$("*") ：すべての要素に反映
$("要素名")  ：指定した要素全てに反映
$("#id名") ：idはユニークなため，反映されるのは一つの要素
$(".class名")  ：一致する全ての要素に反映
$("要素名,#id名") ：要素名もしくはid名に一致する要素を指定
$("#id名 要素名") ：id名内の配下にある全ての要素に反映
  $("親セレクタ").find("指定セレクタ").～と同様？
$("#id名 > 要素名") ：id名直下の要素のみ
  $("親セレクタ").children("指定セレクタ").～と同様？
$("要素名A + 要素名B")  ：要素名Aの次に現れる要素名Bを指定
$("要素名A ~ 要素名B")  ：要素名Aの以降に現れる要素名Bの全てを指定

フィルターを使った指定方法
$("セレクタ:first") ：対象セレクタの最初の要素を取り出す
$("セレクタ:last")  ：対象セレクタの最後の要素を取り出す
$("セレクタ:first-child") ：
$("セレクタ:last-child")  ：
$("セレクタ:even")  ：対象セレクタの偶数番目の要素を取り出す
$("セレクタ:odd")  ：対象セレクタの奇数番目の要素を取り出す
$("セレクタ:eq(n)")  ：対象セレクタのn番目の要素を取り出す（1番目の要素はeq(0)）
$("セレクタ:lt(n)")  ：対象セレクタのn番目以前の要素すべて(n番目の要素は含まず)を取り出す
$("セレクタ:gt(n)")  ：対象セレクタのn番目以降の要素すべて(n番目の要素は含まず)を取り出す
$("セレクタ:contains('text')")  ：？対象セレクタのtextという文字列を含む要素(大文字小文字の区別あり)を取り出す
$("セレクタ:parent")  ：対象セレクタの内、内容を持つ要素を取り出す
$("セレクタ:empty")  ：対象セレクタの内、内容を持たない要素を取り出す
$("セレクタ:has(要素名B)")  ：対象セレクタの内、要素名Bを含んでいる要素を取り出す
$("セレクタ:nth-child(an+b)")  ：？対象セレクタのa個おきに要素を指定する
  an+bの場合，「aで割った時にb余る」要素を取り出す
$("要素名A > 要素名B:only-child")  ：対象セレクタのn番目以降の要素すべて(n番目の要素は含まず)を取り出す

idは同一ページに一箇所しか存在しないので、jQueryの処理が高速化されます。jQueryオブジェクトのセレクタにはできるだけidを用いる

属性フィルターを使った指定方法
$("要素[属性]")  ：指定の属性を持つ要素を取り出す
$("セレクタ:not([属性B])")   ：属性Bを持たない要素Aを取り出す
$("要素[属性='値']")  ：指定の値に等しい属性を持つ要素を取り出す
$("要素[属性!='値']")  ：指定の値ではない属性を持つ要素を取り出す
$("要素[属性^=値]") ：属性値が前方一致する要素を取り出す
$("要素[属性$=値]")  ：属性値が後方一致する要素を取り出す
$("要素[属性*=値]")  ：属性値が部分一致する要素を取り出す
$("要素A[属性B=値C] [属性D]")  ：「属性Bが値C」かつ「属性Dをもつ」，「要素A」を取り出す
$(":header")  ：見出し要素すべてを取り出す
$(":input")  ：指定のフォーム要素を取り出す
他
:text	テキストボックス
:password	パスワード入力ボックス
:radio	ラジオボタン
:checkbox	チェックボックス
:file	ファイル選択ボックス
:submit	送信ボタン
:image	画像ボタン
:reset	リセットボタン
:button	全てのボタン
:hidden	隠し要素

$("セレクタ:has(:enabled)") ：セレクタ内のフォーム要素が利用可能な状態である場合取り出す
他
:dsabled	利用不可の状態
:checked	チェック状態
:selsected	選択状態
:hidden	非表示の状態
:visible	表示状態
:animated	アニメーション中の状態

その他よく使う指定方法
$(this) ：イベントの中で、そのイベントが起こった要素を取得する
$(this).parent("要素A") ：その要素の親要素Aを取り出す
$("要素A",this) ：？その要素の子要素(子孫)の要素Aを取り出す
$(this).children("要素A") ：その要素の子要素Aを取り出す

WordPressでは「$」を使用するとエラーになります。
WordPressでjQueryを動作させるためには、「$」ではなく「jQuery」を使用します。
「$」を1つ1つ「jQuery」に書き換えるのは大変なので、テキストエディタの「置換」機能を使ってまとめて書き換えましょう。

*/

//  イベント処理（処理を行うタイミングを設定・ユーザーアクションを検出する）
/*
イベント名	内容
よく使われる
click	指定したセレクタの領域がクリックされた時
dblclick	指定したセレクタの領域がダブルクリックされた時
mousemove	指定したセレクタ領域へマウスムーブした時
mouseover   指定したセレクタの領域にマウスカーソルが乗せられている間処理を実行し続ける
  マウスカーソルが乗せられている間ずっと処理を実行し続けるため、極端に重い処理をこのイベントと結びつけるのは避けるべきです。
mouseout    マウスアウト
change	フォーム部品の状態変化があった時
focus / blur	要素にフォーカスが当たった時 / 外れた時
load	ドキュメントが読み込まれた時
scroll	画面がスクロールした時
keypress / keyup	キーボードのキーが押された時 / 離した時
mousedown / mouseup	マウスのボタンが押された時 / 離した時
submit	フォームが送信された時
resize	ウィンドウサイズが変化した時

hover	指定したセレクタの領域にマウスが乗った時、外れた時に指定した処理を行う
  clickイベントと違い、引数を2つ書くことに注意。引数の間はカンマで区切ります。

  $('セレクタ').hover(
    function(){
      //  マウスをのせた時の処理;
    },
    function(){
      //  マウスをはずした時の処理;
    }
  );

常用構文
$('セレクタ').on('イベント名',function(){
  //イベント発生時に実行したい処理;
})
on()の第1引数には上記のイベント名を記述し、第2引数には実行したい処理を関数で記述。イベント名は半角スペースを空けて複数定義することが可能
.onがないと、クリックイベント後に発生した要素に対して、クリックイベントが有効でなくなってしまいます。
なので、onをつけた書き方にすれば、動的に生成した要素にもクリックイベントは有効になりますし、複数のイベント指定もできます。
onメソッドを使用した方が拡張性が高くなる場合が多い
onイベントで登録したイベントは、そのページが閉じられるまで有効です。
onイベントを解除するのはoffイベント

cf.基本構文
$('セレクタ').イベント名(function(){
  //イベント発生時に実行したい処理;
});

*/

//  メソッド
/*
よく使用する
$("inputのセレクタ").val();   input内からvalueを取得。
$("inputのセレクタ").val("value");   input内にvalueを挿入。
$("セレクタ").css("プロパティ名");  （cssメソッドのゲット）指定したセレクタにかかるCSSの内、指定したプロパティの値を取得
$("セレクタ").css("プロパティ名", "値");  （cssメソッドのセット）指定したセレクタにかかるCSSの内、指定したプロパティの値を変更
$("セレクタ").text();  （textメソッドのゲット）指定した要素内の文字列を取得。引数なし。
$("セレクタ").text('書き換える文字列');  （textメソッドのセット）指定した要素内の文字列を書き換え
$("セレクタ").hide();  指定した要素を非表示にする。「display」属性が「none」となり、後続要素に幅寄せされる。
$("セレクタ").show();  非表示状態にある指定した要素を表示する
$('フォームのセレクタ').submit();   
$("セレクタ").toggle();  指定した要素が非表示の場合は表示し、表示されている場合は非表示にする
$("セレクタ").slideUp();   下から上へのスライドアニメーション付きで非表示にする。引数を設定した場合、指定された数値(ミリ秒)かけてスライドが行われる
$("セレクタ").slideDown();   上から下へのスライドアニメーション付きで表示する。引数を設定した場合、指定された数値(ミリ秒)かけてスライドが行われる
$("セレクタ").slideToggle();  指定した要素が開いている時には閉めて、閉まっている時には開く
$("セレクタ").fadeOut([speed], [callback]);  フェードアウト（対象要素を少しずつ透明にしながら非表示に）。引数に時間(ミリ秒)を指定することが可能。3秒であれば3000。'slow'(600ミリ秒)、'normal'、'fast'(200ミリ秒)など文字列での指定も可。効果が完了した際に呼び出される関数を第二引数に指定することも出来ます。
$("セレクタ").fadeIn();   フェードイン（非表示になっている対象要素を少しずつ表示）
$("セレクタ").fadeToggle();   フェードイン・アウト（実行されるたびに表示・非表示を繰り返してくれる）
$("セレクタ").addClass("class名"); （addClassメソッド）指定した要素に指定したclassを有効にする
  class名の前にドットは不要。
$("セレクタ").removeClass("class名"); （removeClassメソッド）指定した要素に指定したclassを解除
  class名の前にドットは不要。
$("セレクタ").toggleClass("class名");   クラスの切り替え。指定したクラスがある場合は、そのクラスを解除し、無い場合はそのクラスを有効にする。class名の前にドットは不要。
$(window).scrollTop();  windowやdocumentなどの要素に対して使えるメソッド。ページをどれくらいスクロールしたかのスクロール量を測ることができます。
$("親セレクタ").find("指定セレクタ").addClass("class名"); （findメソッド）指定した親要素のすべての子孫要素(自分よりも下の階層の要素すべて）の中から、指定したセレクタを持つ子孫要素を全て選択
  以下のセレクタと同様？
  配下（子孫）セレクタの指定：　親selector （半角スペース）配下selector
  親selector配下の全ての指定selectorが適用されます。
  【注意】階層が深くなってもすべてに適用
$("親セレクタ").children("指定セレクタ").addClass("class名"); （childrenメソッド）指定した親要素が持つ子要素（一階層だけ下）の中から、指定したセレクタを持つ子要素を全て選択
  以下のセレクタと同様？
  子セレクタの指定：　親selector > 子selector
  親selector > （直下の）子selectorのペア全てが対象となり、
  親selector（直下の）子selectorにのみ装飾が適用されます。
  
ややマニアック
$("セレクタ").eq(n).addClass("class名");  （eqメソッド）jQueryオブジェクトの中から、インデックス番号を指定して要素を取得する。
$("セレクタ").hasClass("class名");  指定したクラスを持っているか判定。持っていればtrue。
$("セレクタ").prev();  同じ階層にあるjQueryオブジェクトの中から、指定したセレクタの前（上）にある要素を取得する。
    <ul>
      <li>前（上）</li>
      <li id="center">真ん中</li>
      <li>次（下）</li>
    </ul>
$("セレクタ").next();  同じ階層にあるjQueryオブジェクトの中から、指定したセレクタの次（下）にある要素を取得する。
$("セレクタ").index($("セレクタ"));  （indexメソッド）jQueryオブジェクトの中から、指定したセレクタのインデックス番号を取得する。セレクタに$がつくのに注意。
$("セレクタ").length;  jQueryオブジェクトの要素の個数を取得する。()は不要。
$("セレクタ").attr("属性名");   （attrメソッドのゲット）「attr」とは「attribute(属性)」の略。指定したセレクタの、指定した属性の値を取得。
  ・id
  ・class
  ・src（imgタグなど）
  ・href（aタグなど）
  ・type（inputタグなど）
  ・data-XX（カスタムデータ属性）など
$("セレクタ").attr("属性名","変更後の属性値");  （attrメソッドのセット）指定したセレクタの、指定した属性の値を変更
$("セレクタ").html();   （htmlメソッドのゲット）指定したセレクタ内のHTMLの内容を丸ごと取得。引数なし。
$("セレクタ").html("変更後のHTMLの内容");  （htmlメソッドのセット）指定したセレクタ内のHTMLの内容を変更。変更前のHTMLの内容が書き換えられてしまうので注意
$("セレクタ").height();  要素の高さを取得する
$("セレクタ").height("500px");   要素の高さを変更する。引数として、変更後の高さを指定
$("セレクタ").width();   要素の横幅を取得する
$("セレクタ").width("500px");   要素の横幅を変更する。引数として 変更後の横幅を指定

*/

//  よく使用する構文
/*
$("セレクタ").each(function(){
  $(this).メソッド();
});

$(this)はeachの引数として渡した関数に自動的に渡され、処理を行う対象となる一つ一つの要素のこと

簡単なアニメーション：少しずつ変化させる
$("セレクタ").animate({CSSプロパティ:値});
animate({})の中で指定するプロパティはCSSとほとんど同じように設定できます。ただし、font-sizeのようにハイフンが付与されているものに関しては、fontSizeというキャメルケースで記述しましょう。
animate()は複数繋げることも可能。それぞれのanimate()メソッドが順番に実行されていく

alert("■■■");
alert($('.hogeCLASS').attr('id'));
class=”hogeCLASS”からidを取得できているかをAlertで確認 ※バグチェックに有効

特定の日付と曜日を取得する
function SpecificDay() {
var i = 3; //(例)：3日後
var date = new Date();
date.setTime(date.getTime() + (i * 24 * 3600 * 1000));
var y = date.getYear();
var m = date.getMonth() + 1;
var d = date.getDate();
if (y < 2000) {
    y += 1900;
}
wday = new Array("日", "月", "火", "水", "木", "金", "土");
document.write(y + "年" + m + "月" + d + "日");
document.write(wday[date.getDay()]);
}

var params = {
  "color": "#0C0",
  "font-size": "13px"
}
$("#sample").css( params );

一度に複数のスタイルを変更する場合、連想配列を引数とする。
ただし、jQuery側で複雑なスタイリングをしてしまうと管理がしづらくなるため、デザインは原則CSSでするようにして、jQuery側では「addClass」や「removeClass」などの処理にとどめておくのが理想的

*/

//  
/*
変数
同じjQueryオブジェクトを複数回使用する時は変数にしましょう。コードが見やすくなる上、jQueryの処理が高速化されます。 JavaScriptと同じく、jQueryで変数宣言にはvarを用います。変数には文字列や数値、jQueryオブジェクトなどを格納することができますが、jQueryオブジェクトを格納する時は、わかりやすいように変数の頭に$を付けるのが慣例となっています。
var $div = $('div');
$div.fadeOut().fadeIn();

メソッドチェーン
メソッドチェーンとは1つのjQueryオブジェクトに連続してメソッドが利用できる構文です。同じjQueryオブジェクトを複数回使用する時は、メソッドチェーンを使うことでも処理速度を高速化できます。$('セレクタ').メソッド().メソッド()...のように書くことで、それぞれのメソッドが適用されます。

*/

//  概要
/*
jQuery：JavaScriptのライブラリ（機能群）の1つ
アニメーションをつけることや、ユーザーの行動に応じたインタラクティブなデザインを実現することができます。
①jQueryオブジェクトを作成し、②そのjQueryオブジェクトに対してメソッド（機能）を呼び出す、という2つが基本
JavaScript（JS）なので、文末にセミコロンが必要です。またコメントもJS同様
(function($){
  「ページ全体が読み込まれたら」
  document.ready(function() {
  ＊jQueryのコード＊（ページ全体が読み込まれた後に実行される）
});
  
})(jQuery);

以下の書き方はどれも同じ動作になります。

$(document).ready(function () { ... });
$().ready(function () { ... });
jQuery(function () { ... });
$(function () { ... });

jQueryを使用するには、jQueryライブラリを読み込む必要があります。ライブラリはインターネット経由で読み込む（CDN：Content Delivery Network）のが一般的です。「jquery api google」で検索

jQueryオブジェクトは、実は配列の「ような」構造をしており、右の図のようにセレクタに合致した要素が配列のように入っています（実際には配列とは異なるものです）。
jQueryオブジェクトも配列同様、0から順にインデックス番号がついています。

*/


//  JavaScript

//  変数・配列について
/*
JavaScriptの変数定義は長らくvarが使われていましたが、現在はconst / letのどちらかしか使いません。もっと言えば、基本的にはconstを最優先で利用するようにし、どうしても変数を途中で変更したい時だけletを使うようにします。
【let】再宣言が不可
【const】再宣言・再代入が不可
const / letはvarと違いブロックスコープの特徴を持っており、変数をあるブロック内だけで完結できます。
if(1) {
  var test1 = 100;
  let test2 = 200;
  const test3 = 300;
}
  
console.log(test1);
console.log(test2);
console.log(test3);

実行結果
100
エラー
エラー
*/

//  関数
/*
functionを利用したケース
function sample() {
  consoel.log('Hello');
}
コンストラクタの定義などにはfunctionを使います

アロー関数を利用したケース
const sample = (name) => console.log(name);

アロー関数は実行する処理が1行だけの場合は{ }も記述不要になる
コンストラクタ定義をアロー関数で行うとエラーになります。
functionとアロー関数は【this】の扱い方が異なるのが大きな理由です。基本的に、コンストラクタ以外の関数定義であればアロー関数を優先的に使っていけば良い

コンストラクタの例
const User = function(name, age) {
  this.name = name;
  this.age = age;
}
 
//メソッドをプロトタイプに定義する
User.prototype.showName = function() {
  console.log(this.name);
}

コンストラクタはプロパティだけを定義して、メソッドはプロトタイプを利用して定義するというのが基本パターンになります。理由は、無駄なメモリを消費しないというのが大きなポイント
プロトタイプはUserインスタンスすべてにおいて共有できるので、インスタンスを作ってもいちいちメソッドがコピーされることはありません。
実は、最近のJavaScriptはクラス構文に対応しているので、プロトタイプなどをあまり意識せずにコンストラクタを作ることも可能

*/

//  class
/*
class User {
    constructor(name, age) {
         this.name = name;
         this.age = age;
    }
 
    showName(){
        console.log(this.name);
    }
}
 
const taro = new User('太郎', 30);
 
taro.showName();

継承
class Man extends User {
  showAge() {
    console.log(this.age);
  }
}


*/

//  エスケープシーケンス
/*
文字	説明
\n	ニューライン。ラインフィード (LF)。（改行文字）
\f	フォームフィード（改ページ）空白
\b	バックスペース
\r	キャリッジリターン（CR・復帰文字： 同じ行の先頭に移動）
\t	水平タブ
¥v	垂直タブ (垂直方向に空白を入れる)
¥0	NULL文字
\'	シングルクォート（'）
\"	ダブルクォート（"）
\\	バックスラッシュ（\）または円記号
\nnn	3桁の8進数nnnによる文字コード指定。ASCII文字（例えば "A" は "\101"）
\xnn	2桁の16進数nnによる文字コード指定。Latin-1文字（例えば "A" は "\x41"）
\unnnn	4桁の16進数nnnnによるUnicode文字（例えば "あ" は "\u3042"）
\u{nnnnnn}	サロゲートペアを含むUnicode文字 (例: \u{20B9F})
クォートを文字列として使用したい場合は、"..." の中でシングルクォート（'）を使うか、'...' の中でダブルクォート（"）を使うか、\" や \' を使います。
. * + ^ | [ ] ( ) ? $ { }などの文字を文字列として正規表現の判定内で使いたい場合エスケープしなければならない。
正規表現で検索や置換をするたびに、特殊文字を気にしてエスケープ処理を行うことが手間である場合は、自分でその処理を行う関数を作り、必要な場面でその関数を利用するという手もあります。

テンプレート文字列
ES6(2015) では、文字列の中で変数を展開可能なテンプレート文字列がサポートされました。ダブルクォート(")、シングルクォート(')の代わりにバッククォート(`) を使用します。
{ ... } の間には JavaScript 構文を記述することが可能

*/

//  Babelを使ったトランスパイル手法
/*
すべてのブラウザが最新のJavaScriptに対応していないうえ、どの構文が使えるのかバラバラ
Babelを利用すると、最新の仕様で書かれたプログラムを古いJavaScriptに変換してくれるのです。
つまり、古いJavaScriptの仕様に変換されているので、ほとんどのブラウザに対応することができる
Babelを利用するにはNode.jsの開発環境が必要になる

*/
