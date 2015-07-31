/**
 * Created by hkh on 2015-02-04.
 */
//var text = '(서울 마포구) ';
var text = '(경기 안산시 단원구) - 생산·건설';
var text2 = '오피스텔/월세'
var cityPattern = /[^(][^)]+/;
var catePattern = /[-][^]+/;
var city = cityPattern.exec(text);
var cate = catePattern.exec(text);
var content = '#담당자: 정과장 HP:010-5424-7927 (문자상담가능)'+
'#근면성실하신분 많은 연락바랍니다!114114에서 보았다고 말씀하세요. ';

try {
    //if (result) {
    console.log(text2.replace(/\/(.+)/, ''));

    console.log(cate);
    console.log(cate.toString().replace(/[-\s]+/, ''));
    city = city[0].split(/\s(.+)/);
    console.log(city);

    console.log('content: '+content.replace('114114에서 보았다고 말씀하세요.', ''));
//}
} catch (err) {
    console.log(err);
}