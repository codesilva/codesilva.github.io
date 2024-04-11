North shopping maracanau


horarios - https://minhaagendavirtual.com.br/agendamentos/available_days/?app_type_id=16268&app_subtype_id%5B%5D=14529&internal=false&client_id=
dias - https://minhaagendavirtual.com.br/agendamentos/available_time_new/?day_id=&app_type_id=16268&app_subtype_id%5B%5D=14529&internal=false


## Benfica

horarios - https://minhaagendavirtual.com.br/agendamentos/available_days/?app_type_id=2200&app_subtype_id%5B%5D=1826&internal=false&client_id=
dias - https://minhaagendavirtual.com.br/agendamentos/available_time_new/?day_id=&app_type_id=2200&app_subtype_id%5B%5D=1826&internal=false

vou por um selenium da vida pra ficar submetendo

1. acessa https://minhaagendavirtual.com.br/agendamentos/novo/casadocidadao
2. seleciona north shopping no select[name=agenda]
    <option value="16268">Casa do Cidadão do North Shopping de Maracanaú - CIN (identidade)</option>
    2.1 pode ser necessarios por o servicos no select2
        basta adicionar o elemento
        <li class="select2-selection__choice" title="CIN - Casa do Cidadão do North Shopping de Maracanaú" data-select2-id="select2-data-31-blq8"><button type="button" class="select2-selection__choice__remove" tabindex="-1" title="Remove item" aria-label="Remove item" aria-describedby="select2-id_servico-container-choice-8z9y-14529"><span aria-hidden="true">×</span></button><span class="select2-selection__choice__display" id="select2-id_servico-container-choice-8z9y-14529">CIN - Casa do Cidadão do North Shopping de Maracanaú</span></li>

        ao ul.select2-selection__rendered
3. seleciona o servico no select[name=servico]
    <option value="14529" data-select2-id="select2-data-18-bwd6">CIN - Casa do Cidadão do North Shopping de Maracanaú</option>
4. clica em proximo
    <a href="#next" role="menuitem">Próximo</a>

5. preenche o nome - <input type="text" name="name" maxlength="200" minlength="6" class="form-control" required="" id="id_name">
6. preenche o email - <input type="email" name="email" maxlength="254" class="form-control" required="" id="id_email">
7. preenche o telefone - <input type="text" name="old_phone" class="form-control international_phone" required="" id="id_old_phone" autocomplete="off" placeholder="11 96123-4567" data-intl-tel-input-id="2" style="padding-left: 87px;">
8. clicar em enviar - <a href="#finish" role="menuitem">Enviar</a>

notas:
    token - <input type="hidden" name="csrfmiddlewaretoken" value="rchwXsAqnbCvLTksRm11oIXhQOBxeSiKeqgeYdEpRvu6qRyrvOY4B0rE7oojsI2d">

Um POST É FEITO EM https://minhaagendavirtual.com.br/agendamentos/novo/casadocidadao

    ```
    csrfmiddlewaretoken: XV3CuOsuwImq6Tj5rctpUc6iJU3LJCUFK92kvzwt02e1LRx45Eqs7uAF0uQxXsE8 (do form)
    agenda: 16268 (do form)
    pass_agenda: 
    servico: 14529 (do form)
    event_type: 
    dia: 
    hora: 17374660 (vem do form)
    birthday: 07/04/1998 (optional)
    client_text: 
    name: Antonio Edigleysson Barbosa da Silva
    email: edigleyssonsilva@gmail.com
    old_phone: +5585986050739
    cpf: 
    gender: 
    select_marital_status: 
    ```
