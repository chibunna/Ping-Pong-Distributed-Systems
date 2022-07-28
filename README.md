# Ping-Pong-Distributed-Systems


This paper will introduce a distributed system, implemented in the form of the classic Ping Pong game using the javascript and processing language. 
The game in question will implement two players (computer and user) hitting a ball on the screen (ping pong), back and forth across a virtual table 
using a racket represented with solid lines (further described below). The rules of the game are quite simple: each player (computer or user), must 
return a ball played towards them by the opponent. A point is scored when a player fails to return the ball within the rules, i.e. before it hits the 
end of the canvas (described below). The speed of the ball is increased sequentially as the game continues, demanding quicker reactions from both players.
