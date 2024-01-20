import { render, screen } from '@testing-library/react';

import { Providers } from '@/redux/provider';
import Layout from '@/app/layout';
import Login from '@/app/(auth)/login/page';

describe('Login Screen', () => {
    it('should have email field', () => {
        render(<Layout><Login /></Layout>) //ARRANGE

        const myElem = screen.getByText('Email'); // ACT

        expect(myElem).toBeInTheDocument(); // ASSERT
    })
})