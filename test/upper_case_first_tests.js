/* globals describe, before, it, require */
var ucfirstchar =  require('../index');
var chai =  require('chai'),
    expect = chai.expect;

describe('ucfirstchar', function() {
    it('upper cases the first character of a plain string', function () {
        expect(ucfirstchar('this is a simple test')).to.equal('This is a simple test');
    });
    it('upper cases the first non-html character in a simple html string', function () {
        expect(ucfirstchar('<b>this is a test</b>')).to.equal('<b>This is a test</b>');
    });
    it('ignores an entity and upper cases the first valid character after the entity', function () {
        expect(ucfirstchar('&amp;this is a test')).to.equal('&amp;This is a test');
    });
    it('ignores leading numbers', function () {
        expect(ucfirstchar('1234this is a test')).to.equal('1234This is a test');
    });
    it('ignores leading punctuation', function () {
        expect(ucfirstchar('"this is a test"')).to.equal('"This is a test"');
    });
    it('Is not confused by < symbols', function () {
        expect(ucfirstchar('< this is a test')).to.equal('< This is a test');
    });
});