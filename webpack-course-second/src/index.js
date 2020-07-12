import * as $ from 'jquery';
import Post from '@models/Post';
import '@/styles/main.css';
import '@/styles/main.less';
import '@/styles/main.scss';

import data from '@/assets/json.json';
import Logo from '@/assets/webpack-logo.png';
import dataXml from '@/assets/data.xml';
import dataCsv from '@/assets/data.csv';

const post = new Post('The great changes', new Date(), Logo);

$('pre').html(post.toString());

console.log('Post', post.toString());
console.table('JSON: ', data);
console.table('XML', dataXml);
console.table('CSV', dataCsv);
