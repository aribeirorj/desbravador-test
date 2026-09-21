import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderRoute } from '@/shared/testing/renderRoute';
import { searchUsers } from '@/features/search/api/searchUsers';
import { SearchPage } from '@/features/search/SearchPage/SearchPage';

vi.mock('@/features/search/api/searchUsers', () => ({ searchUsers: vi.fn() }));

describe('SearchPage', () => {
  beforeEach(() => {
    vi.mocked(searchUsers)
      .mockReset()
      .mockResolvedValue({
        total: 1,
        users: [
          { login: 'torvalds', avatarUrl: 'https://avatars.githubusercontent.com/u/1024025' },
        ],
      });
  });

  it('busca uma única vez depois que o usuário para de digitar e grava o termo na URL', async () => {
    const router = renderRoute(SearchPage, '/', '/');

    await userEvent.type(screen.getByRole('searchbox'), '@linus');

    expect(await screen.findByRole('link', { name: /torvalds/ })).toHaveAttribute(
      'href',
      '/users/torvalds',
    );
    expect(searchUsers).toHaveBeenCalledTimes(1);
    expect(searchUsers).toHaveBeenCalledWith('linus', expect.any(AbortSignal));
    expect(router.state.location.search).toBe('?q=linus');
  });

  it('não busca com menos de 3 caracteres', async () => {
    renderRoute(SearchPage, '/', '/');

    await userEvent.type(screen.getByRole('searchbox'), 'li');

    expect(screen.getByText('Digite ao menos 3 caracteres.')).toBeInTheDocument();
    expect(searchUsers).not.toHaveBeenCalled();
  });

  it('restaura a busca a partir da URL', async () => {
    renderRoute(SearchPage, '/', '/?q=linus');

    expect(screen.getByRole('searchbox')).toHaveValue('linus');
    expect(await screen.findByRole('link', { name: /torvalds/ })).toBeInTheDocument();
  });
});
