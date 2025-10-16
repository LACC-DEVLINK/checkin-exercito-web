import React, { useState } from 'react';
import { AppWindow, LaptopMinimalCheck, MonitorCog, LayoutTemplate, Wallpaper, FileCheck } from 'lucide-react';

const AboutPage = function(){

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Sobre</h1>
          <p className="text-gray-400">Informações sobre o aplicativo e a equipe de desenvolvimento</p>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notificações */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <AppWindow size={20} className="mr-2" />
            Sistema FortAccess
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-400 text-sm">Apresentamos o FortAccess, a solução para o gerenciamento de acesso para eventos militares. O sistema oferece controle em tempo real, acompanhando a movimentação de pessoas, desde a entrada até a saída.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sistema */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <LaptopMinimalCheck size={20} className="mr-2" />
            Equipe de desenvolvimento
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <MonitorCog size={20} className="mr-2" />
                <div className="text-white font-medium">Backend</div>
                <div className="text-gray-400 text-sm">
                  - Luan Levi Barbosa Carvalho;
                  <br />
                  - Anthony Gabriel Peixoto Cardoso;
                  <br />
                  - Alberto Monteiro Miranda Junior;
                  <br />
                  - Marcus Paulo da Silva Batista;
                  <br />
                  - Andrey Marques;
                  <br />
                  - Igor Alexsandro Barbosa da Costa
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <LayoutTemplate size={20} className="mr-2" />
                <div className="text-white font-medium">Frontend</div>
                <div className="text-gray-400 text-sm">
                  - Helena Soares de Brito;
                  <br />
                  - Luiz Eduardo Martins;
                  <br />
                  - Kaio Márcio da Silva Vieira;
                  <br />
                  - Dan Cezar Ramos de Carvalho;
                  <br />
                  - Wallace Ney dos Santos Silva;
                  <br />
                  - Matheus Barbosa de Andrade;
                  <br />
                  - Sean Max Franco Pinheiro;
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Wallpaper size={20} className="mr-2" />
                <div className="text-white font-medium">Design</div>
                <div className="text-gray-400 text-sm">
                  - Breno Luiz da Silva Ferreira;
                  <br />
                  - Eros Souza Scoles Cano;
                  <br />
                  - Diego Prestes Cohen;
                  <br />
                  - Felipe Ricardo Teles Sauma;
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <FileCheck size={20} className="mr-2" />
                <div className="text-white font-medium">Documentação</div>
                <div className="text-gray-400 text-sm">
                  - Waldo César Soares de Souza;
                  <br />
                  - Rafael Rocha da Silva;
                  <br />
                  - Samuel Maciel de Oliveira;
                  <br />
                  - Caique Pinto da Costa;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
