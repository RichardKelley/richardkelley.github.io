:- table path/2.

% Bigger graph, cycles allowed
edge(a,b). edge(a,c). edge(a,d).
edge(b,e). edge(b,f).
edge(c,f). edge(c,g).
edge(d,g). edge(d,h).
edge(e,i).
edge(f,i). edge(f,j).
edge(g,j). edge(h,c).   % cycle
edge(i,k). edge(j,k).
edge(k,l).

path(X,Y) :- edge(X,Y).
path(X,Y) :- edge(X,Z), path(Z,Y).