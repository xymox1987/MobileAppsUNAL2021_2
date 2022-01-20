using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRProject.Hubs
{
    public class TicTocHub: Hub
    {
        public async Task SendMessage(string user, string message)
        {
            
            await Clients.All.SendAsync("ReceiveMessage", user, message);



        }

        public async Task StartGame()
        {

            await Clients.All.SendAsync("start_game");

        }

        public async Task Move(string point)
        {

            await Clients.All.SendAsync("move", point);

        }


        public async Task Winner(string mode)
        {

            await Clients.All.SendAsync("winner", mode);

        }

        public async Task RestartGame()
        {

            await Clients.All.SendAsync("restart_game");

        }


        public async Task ChangeMode(string mode)
        {

            await Clients.All.SendAsync("change_mode", mode);

        }

    }
}
