document.addEventListener('DOMContentLoaded', function() {
    const addPostButton = document.getElementById('add-post-button');
    const postContent = document.getElementById('post-content');
    const postsContainer = document.getElementById('posts-container');
    const profilePic = document.getElementById('profile-pic');
    const uploadProfilePic = document.getElementById('upload-profile-pic');
    const editProfileButton = document.getElementById('edit-profile-button');
    const modal = document.getElementById('edit-profile-modal');
    const closeModal = document.querySelector('.close');
    const saveProfileButton = document.getElementById('save-profile-button');
    const editUsername = document.getElementById('edit-username');
    const editProfession = document.getElementById('edit-profession');
    const editLocation = document.getElementById('edit-location');
    const editRelationshipStatus = document.getElementById('edit-relationship-status');
    const editBirthday = document.getElementById('edit-birthday');
    const editBio = document.getElementById('edit-bio');
    const profileName = document.querySelector('.profile-name');
    const aboutMeList = document.getElementById('about-me').querySelector('ul');

    // Abre o modal de edição de perfil ao clicar no botão "Editar Perfil"
    editProfileButton.addEventListener('click', function() {
        modal.style.display = 'block'; // Mostra o modal
        // Preenche os campos do modal com as informações atuais
        editUsername.value = profileName.textContent;
        editProfession.value = getTextContentByLabel("Profissão:");
        editLocation.value = getTextContentByLabel("Mora em:");
        editRelationshipStatus.value = getSelectedValueByText("Status de relacionamento:");
        editBirthday.value = getTextContentByLabel("Aniversário:").trim(); // Obtém a data atual
        editBio.value = getTextContentByLabel("Biografia:");
    });

    // Fecha o modal ao clicar no botão de fechar (X)
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none'; // Esconde o modal
    });

    // Fecha o modal ao clicar fora da área do modal
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none'; // Esconde o modal
        }
    });

    // Salva as alterações no perfil ao clicar em "Salvar"
    saveProfileButton.addEventListener('click', function() {
        // Atualiza as informações do perfil com os valores dos campos do modal
        profileName.textContent = editUsername.value;
        updateAboutMeField("Profissão:", editProfession.value);
        updateAboutMeField("Mora em:", editLocation.value);
        updateAboutMeField("Status de relacionamento:", editRelationshipStatus.value);
        updateAboutMeField("Aniversário:", editBirthday.value);
        updateAboutMeField("Biografia:", editBio.value);
        
        // Fecha o modal após salvar
        modal.style.display = 'none';
    });

    // Função auxiliar para obter o texto do campo atual no "Sobre mim"
    function getTextContentByLabel(label) {
        const lis = Array.from(aboutMeList.getElementsByTagName("li"));
        const element = lis.find(li => li.textContent.startsWith(label));
        return element ? element.textContent.slice(label.length) : "";
    }

    // Função auxiliar para obter o valor selecionado em um campo select pelo texto do label
    function getSelectedValueByText(label) {
        const lis = Array.from(aboutMeList.getElementsByTagName("li"));
        const element = lis.find(li => li.textContent.startsWith(label));
        if (element) {
            const labelText = element.textContent.slice(label.length).trim();
            return labelText.toLowerCase(); // Garantindo que o valor seja lowercase para o select
        }
        return "";
    }

    // Função auxiliar para atualizar o campo "Sobre mim"
    function updateAboutMeField(label, value) {
        const lis = Array.from(aboutMeList.getElementsByTagName("li"));
        const element = lis.find(li => li.textContent.startsWith(label));
        if (element) {
            element.textContent = `${label} ${value}`;
        }
    }

    // Adiciona um post na timeline ao clicar no botão "Adicionar Post"
    addPostButton.addEventListener('click', function() {
        const content = postContent.value.trim();
        if (content) {
            const postElement = createPostElement(content);
            postsContainer.appendChild(postElement);
            postContent.value = '';
        }
    });

    // Cria um elemento de post
    function createPostElement(content) {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        
        const postContent = document.createElement('p');
        postContent.textContent = content;
        postElement.appendChild(postContent);
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.className = 'edit-post-button';
        editButton.addEventListener('click', function() {
            editPost(postContent);
        });
        postElement.appendChild(editButton);
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.className = 'delete-post-button';
        deleteButton.addEventListener('click', function() {
            deletePost(postElement);
        });
        postElement.appendChild(deleteButton);
        
        return postElement;
    }

    // Edita uma postagem
    function editPost(postContentElement) {
        const newContent = prompt('Editar postagem:', postContentElement.textContent);
        if (newContent !== null) {
            postContentElement.textContent = newContent;
        }
    }

    // Exclui uma postagem
    function deletePost(postElement) {
        if (confirm('Tem certeza que deseja excluir esta postagem?')) {
            postElement.remove();
        }
    }

    // Abre o seletor de arquivo ao clicar na foto de perfil
    profilePic.addEventListener('click', function() {
        uploadProfilePic.click();
    });

    // Atualiza a foto de perfil após selecionar um novo arquivo
    uploadProfilePic.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePic.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
});
