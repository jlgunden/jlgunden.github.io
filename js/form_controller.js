/**
 * This class handles event handling for the passed in elements
 *
 * @constructor
 * @param  {object} inputs Object containing information about the inputs. Each key must be the id of the input
 * @param  {jQuery} submit Submit button element to submit the data
 * @param  {jQuery} container The parent container of the inputs to attach the event handler to
 * @return {void}
 */
var form_controller = function(inputs, submit, container) {
  this.inputs_ = inputs;
  this.submit_ = submit;
  this.loading_ = false;
  container.focusout(this.focusout_handler_.bind(this));
  submit.click(this.submit_handler_.bind(this));
};

/**
 * Handler for focusout event
 * Focusout is used over blur due to focusout bubbling
 *
 * @private
 * @param  {event} e
 * @return {void}
 */
form_controller.prototype.focusout_handler_ = function(e) {
  var self = this;

  if (e.target !== e.currentTarget) {
    var input = self.inputs_[e.target.id];
    self.validate_(input);
  }

  e.stopPropagation();
};

/**
 * Validate the input and update GUI if errors are present
 *
 * @private
 * @param  {jQuery} input
 * @return {void}
 */
form_controller.prototype.validate_ = function(input) {
  var errors = [];

  var value = input.input_element.val();

  if (
    input.required === true &&
    value === ''
    ) {
    errors.push(input.name + ' is required');
  }

  switch (input.type) {
    // nothing to check for these cases
    case 'string':
    case null:
    case false:
    case undefined:
      break;
    case 'email':
      if (value.match(/^.+@.+\..+$/) === null) {
        errors.push(input.name + ' is not a valid email address');
      }
      break;
  }

  // update GUI
  if (errors.length > 0) {
    input.input_element.addClass('input_error');
    input.error_message_element.html(errors[0]);
  }
  else {
    if (input.input_element.hasClass('input_error')) {
      input.input_element.removeClass('input_error');
      input.error_message_element.html('&nbsp');
    }
  }

  return errors;
};

/**
 * Calls validate on all inputs and returns a flag if errors are present
 *
 * @private
 * @return {Boolean} [description]
 */
form_controller.prototype.validate_all_ = function() {
  var pass = true;

  for (var input in this.inputs_) {
    var errors = this.validate_(this.inputs_[input]);
    if (errors.length > 0) {
      pass = false;
    }
  }

  return pass;
};

/**
 * Get the values of all of the inputs
 *
 * @private
 * @return {object}
 */
form_controller.prototype.get_input_values_ = function() {
  var values = {};

  for (var input in this.inputs_) {
    console.log(input);
    values[input] = this.inputs_[input].input_element.val();
  }

  return values;
};

/**
 * Handler for submit click event
 * TODO: This isn't generic, probably necessary to create a base class
 * with over-writable submit_handler_
 *
 * @private
 * @return {void}
 */
form_controller.prototype.submit_handler_ = function() {
  var self = this;

  if (!this.validate_all_() || this.loading_) {
    return;
  }

  this.loading_ = true;
  this.submit_.html('Sending...');

  var values = this.get_input_values_();
  var args = {
    'email_address': values.email_address,
    'name_first': values.name_first,
    'name_last': values.name_last,
    'message': values.message
  };

  api('email', 'send_email', args, function(response) {
    if (response.error) {
      self.submit_.html('Send');
      self.loading_ = false;
      // TODO: Something other than an alert
      alert('Oops! something went wrong with the message :(\n\nPlease try again later or use the link on the homepage to send me an email.');
    }
    else {
      $('#content').html('');

      var card_content = $(document.createElement('div'));
      card_content.addClass('card_content');

      var name_title = $(document.createElement('div'));
      name_title.addClass('card_title');
      name_title.html('Thanks ' + values.name_first + '!');

      var card_line = $(document.createElement('div'));
      card_line.addClass('card_line');
      card_line.html('Your message has been sent. With any luck, the internet will deliver it to me! I will be in touch soon.');

      card_content.append(name_title);
      card_content.append(card_line);
      $('#content').append(card_content)
    }
  });
};
