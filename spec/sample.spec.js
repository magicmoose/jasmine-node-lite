describe('Test Suite 1', function() {

    describe('Sub suite ', function() {


        it('Spec1', function() {
            expect(1 + 2).toEqual(2);
            expect(1 + 2).toEqual(4);
        });

        it('Spec2', function() {
            expect(1 + 2).toEqual(2);
        });
    });
});