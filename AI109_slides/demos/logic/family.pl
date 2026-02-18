% Facts
parent(alice, bob).
parent(bob, carol).
parent(alice, dave).

% Rule
grandparent(X, Y) :-
    parent(X, Z),
    parent(Z, Y).