/** @type {import('prettier').Config} */
// prettier.config.js
module.exports = {
  // 한 줄의 코드 길이 지정
  printWidth: 80,
  // 문자열을 사용할 때 따옴표 형식 지정
  singleQuote: true,
  // 객체의 키와 값 사이에 공백 추가
  bracketSpacing: true,
  // 화살표 함수의 매개변수 괄호 생략 여부 지정
  arrowParens: 'always',
  // 마지막에 콤마 사용 여부 지정
  trailingComma: 'es5',
  // 탭 대신 스페이스 사용 여부 지정
  useTabs: false,
  // 들여쓰기 레벨 지정
  tabWidth: 2,
  // 객체 리터럴의 중괄호 위치 지정
  bracketSameLine: false,
  // 세미콜론 사용 여부 지정
  semi: true,
  // 현재 파일의 특정 구문에 대한 범위 지정
  rangeStart: 0,
  // 현재 파일의 특정 구문에 대한 범위 지정
  rangeEnd: Infinity,
  // 파일의 끝에 빈 줄을 추가할지 여부 지정
  insertFinalNewline: false,
  // 태그 사이에 공백 추가 여부 지정
  htmlWhitespaceSensitivity: 'css',
  // 들여쓰기 스타일 지정
  endOfLine: 'lf',
  // import 정렬 순서 지정
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^types$',
    '^@/env(.*)$',
    '^@/types/(.*)$',
    '^@/config/(.*)$',
    '^@/lib/(.*)$',
    '^@/hooks/(.*)$',
    '^@/components/ui/(.*)$',
    '^@/components/(.*)$',
    '^@/styles/(.*)$',
    '^@/app/(.*)$',
    '',
    '^[./]',
  ],
};
